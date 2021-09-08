<h1>Employee Tracker</h1>
  <image src='https://img.shields.io/badge/license-MIT-green.svg' />
  <h2>Description</h2>
  
  The Employee Tracker is a command-line application (CLI) content-management system (CMS) that allows a user to manage a company's current employee database. The Employee Generator was created leveraging Node.js, Inquirer, and MySQL. The user is able to perform the following functions: VIEW -> All departments, All roles, All employees, Employees by Manager, Employees by Department, or the budget of a specific department; MODIFY -> ADD or DELETE departments, roles, and employees. CHANGE -> Employee's roles or managers. 
  
  <h2>Functionality</h2>
  The Employee Tracker is a simple loop of Inquirer prompts that call methods on the db class based on the selected prompt. The 'db' constant which is a Database object. The Database object is a Class that contains various methods that make queries to the SQL database. These queries are SELECTs which will grab 'rows' that will then by displayed in the terminal via the 'console.table' command from the 'console.table' package, INSERTs that will add data to specific tables, DELETEs which will remove specific data from tables, UPDATEs that will update current rows in the tables, and some helper functions that retrieve primary id's from tables given another column's value (typically a name, or title). If these methods rely on another method, they are made asynchronous, so that the previous query completes prior to running another one. All of these methods can be found in the Database.js file in the lib directory. 
  
  On the note of things being asynchronous, most of the data handling after an inquirer prompt is asynchronous with verification messages to ensure that the neccesarry query has completed before the user does anything else in the database. 

  <h2>Table of Contents</h2>
 <ul>
  <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contribution">Contribution</a></li>
    
  <li><a href="#questions">Questions</a></li>
 </ul>

  <h2 id="installation">Installation</h2>
  <ol>
    <li>Install node.js and MySql for your operating system. (MySQL will need to be configured as well)</li> 
    <li>Ensure that the 'node' command can be ran in the terminal by fixing the PATH if you are on Windows.</li> 
    <li>Clone or download the contents of this project's repo onto your local machine.</li> 
    <li>NAviaget to the cloned directory via your terminal.</li> 
    <li>Run 'npm -install' in the terminal to download the required dependencies. </li> 
    <li>Run the db.sql, schema.sql, and seeds.sql files in the terminal using MySQL prior to running the app.</li> 
    <li>Launch the app via typing 'npm start' in the terminal. </li> 
    <li>Congratulations, you are now in the Employee Tracker! Have fun (^^)</li> 
    
  </ol>
  

  <h2 id="usage">Usage</h2>
  <p>Checkout the link to below to view a walkthrough video that showcases the functionality and usage of the Employee Tracker. (PS: I tell a small lie in the video, the "script" to run the app.js in ther terminal is in the package.json file not the package-lock.json file)

   [Employee Tracker Walkthrough Video](https://drive.google.com/file/d/1DU588lkNvMskKdr2F_seiD4n2vJGQC6m/view) 
  
  </p>
  
 
  
  <h2 id="license">License</h2>

   MIT - Find out more about this project's license(s) at: [https://choosealicense.com/licenses/](https://choosealicense.com/licenses/)

  <h2 id="contribution">Contribution</h2>
  <p>If you find any bugs, or think of any features that would be nice to add, please send an email to the address in the 'Questions' section.</p>
  

  <h2 id="questions">Questions</h2>
  
  <p> 
  Made by: AshisPatel<br />
  Github Profile: https://github.com/AshisPatel<br />
  </p>Email: ashis.n.patel@gmail.com<br />Please send me an email if you have any questions or comments about this project.
  
  <h2> End Note - A Thank You to the Reader </h2>

  Thank you for taking the time to visit my application and read through the README! This application gave me a _SOLID_ handle on asynchronous behavior in Javascript. Something that I suppose I had only previously understood artificially. However, once my items were returning _undefined_ but my results were still being logged well... after a few hours of searching I understood how to make asynchronous things play nice! All hail the mighty **AWAIT** (though if I had my say, I would change this to 'hold_up')! Now aside from async revelations this project introduced a significant amount of SQL. SQL I have got to say, while trying to make the syntax make sense in my head is a bit like chopping up together incomplete sentences, ULTIMATELY, I get what it's doing. And I want to appreciate it for being able to retrieve data for me from a database, so that I don't have to write the script to do it. I <3 you SQL. Thank you for listening to my ramblings, please enjoy the fun fact and gif from my collection of _gifs that make me laugh_! Hopefully they brighten up your day and give you something nice to show a friend (^^)b, I'll see you around!

  **FUN FACT:** The term "o'clock" is a contraction of the term "of the clock", which comes from 15th-century references to medieval mechanical clocks. During these times, sundials were also valid methods of timekeeping. So in order to clarify that something was using time from a clock, one would phrase it as "It is nine of the clock". Ultimately, this was abbreviated down to "nine o'clock". 
  
  The term “o’clock” is a contraction of the term “of the clock”. It comes from 15th-century references to medieval mechanical clocks. At the time, sundials were also common timekeepers. Therefore, to make clear one was referencing a clock’s time, they would say something like, “It is six of the clock” — which, over time, was shortened to “six o’clock”
  
  _Live footage of me trying to launch a query from the inquirer prompt not using await_

 ![Rocket hair launches man's head into the ceiling](https://github.com/AshisPatel/Employee-Tracker-CMS/blob/main/assets/gifs/rocket_chair.gif)
