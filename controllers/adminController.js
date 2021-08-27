const Customer = require('../models/Customer');
const Suggestion = require('../models/Suggestion');
const excel = require("exceljs");

// download customer
const download = (req, res) => {
  Customer.find().then((objs) => {
    let customer = [];

    objs.forEach((obj) => {
      customer.push({
        id: obj.id,
        name: obj.name, 
        email: obj.email,
        phone: obj.phone,
        capacity: obj.capacity,
        destination: obj.destination,
        packages: obj.packages,
        departure_date: obj.departure_date
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Customer");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Phone", key: "phone", width: 10 },
      { header: "Capacity", key: "capacity", width: 10 },
      { header: "Destination", key: "destination", width: 10 },
      { header: "Packages", key: "packages", width: 10 },
      { header: "Date", key: "departure_date", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(customer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "customers.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

// download suggestion
const downloadSuggestion = (req, res) => {
  Suggestion.find().then((objs) => {
    let suggestion = [];

    objs.forEach((obj) => {
      suggestion.push({
        id: obj.id,
        email: obj.email,
        phone: obj.phone,
        message: obj.message
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Suggestion");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Email", key: "email", width: 25 },
      { header: "Phone", key: "phone", width: 10 },
      { header: "Message", key: "message", width: 255 }
    ];

    // Add Array Rows
    worksheet.addRows(suggestion);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "suggestions.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

module.exports = {
  viewDashboard : (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },
  // Customer
  viewCustomer: async(req, res) => {
    const customer = await Customer.find();
    // console.log(customer);
    res.render('admin/customer/view_customer', {customer});
  },
  addCustomer: async (req, res) => {
    const {name, email, phone, capacity, destination, packages, departure_date} = req.body;
    // console.log(name, email, phone, capacity, departure_date);
    await Customer.create({name, email, phone, capacity, destination, packages, departure_date});
    res.redirect('/admin/customer');
  },
  editCustomer: async (req, res) => {
    const {id, name, email, phone, capacity, destination, packages, departure_date} = req.body;
    const customer = await Customer.findOne({ _id: id});
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.capacity = capacity;
    customer.destination = destination;
    customer.packages = packages;
    customer.departure_date = departure_date;
    await customer.save();
    res.redirect('/admin/customer');
  },
  deleteCustomer: async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findOne({ _id: id });
    await customer.remove();
    res.redirect('/admin/customer');
  },

  // Suggestion
  viewSuggestion: async (req, res) => {
    const suggestion = await Suggestion.find();
    // console.log(suggestion);
    res.render('admin/suggestion/view_suggestion', {suggestion});
  },
  addSuggestion: async (req, res) => {
    const {email, phone, message} = req.body;
    await Suggestion.create({email, phone, message});
    res.redirect('/admin/suggestion');
  },
  editSuggestion: async(req, res) => {
    const {id, email, phone, message} = req.body;
    const suggestion = await Suggestion.findOne({ _id: id});
    suggestion.email = email;
    suggestion.phone = phone;
    suggestion.message = message;
    await suggestion.save();
    res.redirect('/admin/suggestion');
  },
  deleteSuggestion: async (req, res) => {
    const { id } = req.params;
    const suggestion = await Suggestion.findOne({ _id: id });
    await suggestion.remove();
    res.redirect('/admin/suggestion');
  },
  download,
  downloadSuggestion
}
