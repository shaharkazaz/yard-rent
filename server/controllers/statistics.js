module.exports = {
    graph1: (req, res) => {
        const response = [{
            day: "Sunday",
            orders: 50,
            rewards: 10
        } ,{
            day: "Monday",
            orders: 30,
            rewards: 20
        } ,{
            day: "Tuesday",
            orders: 19,
            rewards: 30
        }, {
            day: "Wednesday",
            orders: 78,
            rewards: 40
        }];
        res.status(200).json(response)
    }
    ,
    graph2: (req, res) => {
        const response = [{
            category: "Furnitire",
            orders: 50
        }, {
            category: "Shoes",
            count: 20
        }, {
            category: "Electric",
            count: 44
        }, {
            category: "Garden",
            count: 12
        }]
        res.status(200).json(response)
    }
};
