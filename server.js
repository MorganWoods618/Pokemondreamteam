var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var morgan = require('morgan');
// var User = require('./models/user');
var hbs = require('express-handlebars'); 
var path = require('path'); 
var sequelize = require('./config/connection')
var routes = require('./routes');
const Character = require('./models/Character');
const User = require('./models/User')
// invoke an instance of express application.
var app = express();
var port = process.env.PORT || 3001;
// set our application port
app.set('port', port);

//image
app.use(express.static('public'));


app.set('view engine', 'handlebars');

app.use(require('./routes/api/characterRoutes'));
// set morgan to log info about our requests for development use.

// app.use(morgan("tiny"));
// app.listen(3001, () => {
//   console.debug("App listening on :3001");
// });

// morgan.token("host", function (req, res) {
//   return req.hostname;
// });

// app.use(
//   morgan(
//     ":method :host :status :param[id] :res[content-length] - :response-time ms"
//   )
// );

// morgan.token("param", function (req, res, param) {
//   return req.params[param];
// });

// app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// handle bars config
app.engine('hbs', hbs({extname: 'hbs',defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'})); 

//app.engine('hbs', hbs.engine); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs'); 
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var hbsContent = {userName: '', loggedin: false, title: "You are not logged in today", body: "Hello World"}; 

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
		
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    console.log("login")
    // res.redirect('/login');
});


// route for user signup
app.route('/signup')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        Character.findAll({})
        .then(CharacterData=>{
            const characters = CharacterData.map(character=>character.get({plain:true}))
            res.render('signup', {characters});

        })
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            //email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        console.log("welcome to login")
        //res.sendFile(__dirname + '/public/login.html');
        res.render('login', hbsContent);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    console.log("welcome to dashboard")
    if (req.session.user && req.cookies.user_sid) {
		hbsContent.loggedin = true; 
		hbsContent.userName = req.session.user.username; 
		//console.log(JSON.stringify(req.session.user)); 
		console.log(req.session.user.username); 
		hbsContent.title = "You are logged in"; 
        res.sendFile(__dirname + '/public/dashboard.html');
        res.render('index', hbsContent);
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		hbsContent.loggedin = false; 
		hbsContent.title = "You are logged out!"; 
        res.clearCookie('user_sid');
		console.log(JSON.stringify(hbsContent)); 
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});



// route for handling 404 requests(unavailable routes)
// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// });

const bcrypt = require('bcrypt')

app.use(express.json())
//database information input here//
const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }    
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
       if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('success')
       } else {
        res.send('Not Allowed')
       }
    } catch {
        res.status(500).send()
    }
})

app.use(routes)
sequelize.sync({force:false}).then(function(){
// start the express server
app.listen(app.get('port'), () => console.log(`Server listening on http://localhost:${app.get('port')}`));
})