require('dotenv').config();
const express = require("express");
const port = process.env.PORT
const app = express();
const axios = require('axios');
const {Telegraf} = require('telegraf');
const Markup = require('telegraf')
// const Extra = require('telegraf/extra')

const bot = new Telegraf("1968145520:AAHkTw4B7e39niITNFf3QhYRTcFv2SmLi48")

// bot.use((ctx) => {
//     ctx.reply("Hello Dear")
// })
bot.start((ctx) => {
    ctx.reply("Welcome dear, Greetings!!")
});

bot.on("sticker", (ctx) => {
    ctx.reply("cool")
});
bot.hears("Hello", (ctx) => {
    ctx.reply("Hello Dear")
})

bot.hears("Good Morning", (ctx) => {
    ctx.reply("Good Morning Dear")
})

bot.command("fortune",(ctx) => {
    url = 'http://yerkee.com/api/fortune'
    axios.get(url).then((res) =>{
        ctx.reply(res.data.fortune)
    })
})
bot.action('yes', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "How many does have you took?", {
        reply_markup:{
            inline_keyboard:[
                [{text: '1', callback_data:'one'}, {text:'2', callback_data: 'two'}]
            ]
        }
    })
} )


bot.command('poll', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Are you vacinated?", 
    {
        reply_markup:{
           inline_keyboard:[
               
                [
                    {text: 'yes', callback_data: "yes"}, {text: 'no', callback_data: "true"}
                ]
            ],
            resize_keyboard:true,
            one_time_keyboard: true
        }
    }
    )
})
// bot.hears('yes', ctx => {
//     bot.telegram.sendMessage(ctx.chat.id, "How many does have you took?", {
//         reply_markup:{
//             inline_keyboard:[
//                 [{text: '1', callback_data:'one'}, {text:'2', callback_data: 'two'}]
//             ]
//         }
//     })
// } )

bot.launch();
app.listen(port, () => {
    console.log(`app is started on port ${port}`)
})