const Ticket = require('../models/Ticket')

class MyDB {
    constructor() {
        this.tickets = [];
    }

    /**
     * 
     * @param {string} username 
     * @param {number} price
     * @return {Ticket}
     */
    create(username, price) {
        const ticket = new Ticket(username, price);
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * 
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>}
     */

    bulkCreate(username, price, quantity) {
        const result = [];
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price)
            result.push(ticket);
        }
        return result;
    }

    /**
     * 
     */
    find() {
        return this.tickets;
    }

    /**
     * 
     * @param {string} ticketId 
     * @returns {Ticket} ticket 
     */
    findById(ticketId) {
        const ticket = this.tickets.find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        );

        return ticket;
    }
    /**
     * 
     * @param {string} username 
     * @returns {Array<Ticket>}
     */
    findByUserName(username) {
        const tickets = this.tickets.filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username === username
        );
        return tickets;
    }
    /**
     * 
     * @param {string} ticketId 
     * @param {{username:string,price:number}} ticketBody
     * @returns {Ticket}
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;
        ticket.updatedAt = new Date();

        return ticket;
    }
    /**
     * delete ticket from db
     * @param {string} ticketId
     */
    deleteById(ticketId) {
        const index = this.tickets.findIndex(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        );

        if (index !== -1) {
            this.tickets.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {number} winnerCount 
     * @returns {Array<Ticket>}
     */
    draw(winnerCount) {
        let indexes = new Array(winnerCount)
        for (let i = 0; i < winnerCount; i++) {
            let index = Math.floor(Math.random() * this.tickets.length);
            while (indexes.includes(index)) {

                index = Math.floor(Math.random() * this.tickets.length);
            }
            indexes.push(index);
        }
        const winners = [];
        const winner = indexes.map(index => {
            const value = this.tickets[index]
            winners.push(value)
        });
        return winners;
    }
}

const myDB = new MyDB();
module.exports = myDB;