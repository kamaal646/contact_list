const express = require('express');
//const { create } = require('node:domain');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware1
//   app.use(function(req, res, next){
//       console.log('middleware 1 called');
//       next();
//   })

// //middleware2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();   
// })

 var contactList = [
     {
         name: "kamaal",
         phone: "1234567892"
     },
     {
        name: "mohit",
        phone: "3216549872"
     },
     {
        name: "prolin",
        phone: "165463165"
     },
     {
         name: "pravesh",
         phone: "4453465455"
     }
 ]

 app.get('/practice', function(req, res){
    return res.render('practice' , {
        title: "let us play with ejs"
   });
});


app.get('/', function(req, res){
    
   Contact.find({}, function(err, contacts){
       if(err){
           console.log('Error in fetching contacts from db');
           return;
       }
         return res.render('home', {
             title:"Contacts List",
             contact_list: contacts
         });
   })
})

app.post('/create-contact', function(req, res) {
    //  contactList.push({
    //       name: req.body.name,
    //       phone: req.body.phone
 //});
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
            if(err)
            {
              console.log('error in creating a contact');

                return;
            }

        console.log('******',newContact);
        return res.redirect('back');
    
    });      
});


app.get('/delete-contact', function(req, res) {
    console.log(req.query);
    //delete the contact
    let id = req.query.id;

    // find the contact in the db using id and delete
     Contact.findOneAndDelete(id, function(err){
         if(err){
        console.log('error in delteing in object from database');
        return;
         }

         return res.redirect('back');
     });

     
    // let contactIndex = contactList.findIndex(contact => contact.id == id);
    //   if(contactIndex != -1)
    //   {
    //       contactList.splice(contactIndex, 1);
    //   }
    //   return res.redirect('back');
});



app.listen(port, function(err){
    if(err)
    {
        console.log('error in running the server', err);
    }
    console.log('yup my express server is running on port', port);
});
