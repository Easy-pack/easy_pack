const db = require('../../database/index');

module.exports.detailDashboardUser = async (req, res, next) => {
    const {
        id
    } = req.params;
    var ridesCounter = 0
    var total_expenses = 0;
    var topTransactions = [];
    var months = {};
    var monthsArray = [];
    var deliveries = [];
    var expenses = [];
    var pending = 0;
    var monthLetter = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    try {

        const transactions = await db.transaction.findAll({
            where: {
                userId: id
            },
            include: [
                db.driver
            ]
        });
        for (var i = 0; i < transactions.length; i++) {
            total_expenses += transactions[i]["price"];
            var currentMonth = transactions[i]["request_date"].getMonth();
            if (!months[currentMonth]) {
                months[currentMonth] = {
                    deliveries: 1,
                    expenses: transactions[i]["price"]
                };
            } else {
                months[currentMonth]["deliveries"]++
                months[currentMonth]["expenses"] += transactions[i]["price"]
            }
            ridesCounter++
        }

        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i]['state'] === "Pending") {
                pending++
            }
        }

        for (var i = 0; i < monthLetter.length; i++) {
            if (i.toString() in months) {
                monthsArray.push(monthLetter[i]);
                deliveries.push(months[i.toString()]["deliveries"])
                expenses.push(months[i.toString()]["expenses"])
            } else {
                monthsArray.push(0);
                deliveries.push(0);
                expenses.push(0)

            }

        }
        if (transactions.length > 6) {
            for (var i = 0; i < 5; i++) {
                topTransactions.push(transactions[i])
            }
        } else {
            topTransactions = transactions;
        }

        res.status(200).json({

            total_expenses,
            topTransactions,
            months,
            monthLetter,
            monthsArray,
            deliveries,
            expenses,
            pending,
            ridesCounter
        })

    } catch (e) {
        console.log('abayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
        res.status(400).json({
            error: e.message
        });
    }
}