const Customer = require('../models/Customer');
const excel = require("exceljs");

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

module.exports = {
  viewDashboard : (req, res) => {
    res.render('admin/dashboard/view_dashboard');
  },
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
  download,
}
