/**
* To get started with this code, create a node project and add the readline package.
* Add the following code to the base file you execute to create the application.
* Check out the complete version at https://Winston-Services/Cli-Counter-App
*/

let n = 0;
const readline = require("readline");
let question = `** Enter a command to execute **\n
(C)ount\n(M)enu\n(Q)uit\n
 Usage : \`[command] "PARAM" ...\`\n
You can either type the letter in parenthese or type the word. 
It's not case sensitive. \nCommand : `;

let runCounter = false;
const runner = () => {
  function menu() {
    console.clear();
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(question);
    rl.prompt();
    rl.on("line", userResponse => {
      if (userResponse.toLowerCase().match(/^c(ount)?$/i)) {
        // (c)ount
        if (!runCounter) runCounter = true;
        rl.close();
        if (runCounter) {
          function counter() {
            if (n <= 10) {
              console.clear();
              console.log("Counting %d", n);
              n++;
              if (n >= 10) {
                runCounter = false;
                n = 0;
                return menu();
              } else
              setTimeout(counter, 5000);
            }
          }
          return counter();
        } else return menu();
      } else if (userResponse.toLowerCase().match(/^m(enu)?$/i)) {
        // (m)enu
        rl.close();
        return menu();
      } else if (userResponse.toLowerCase().match(/^q(uit)?$/i)) {
        // (q)uit
        rl.close();
        return process.exit();
      } else console.log(question + userResponse);
    });
    rl.on("SIGINT", () => {
      rl.question("Exit (y or n)? ", input => {
        if (input.match(/^y(es)?$/i)) {
          rl.close();
          process.exit();
        }
      });
    });
  }
  menu();
};

runner();
