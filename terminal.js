const about_me = 0;

CS_CLI = {
    type : "file",
    name : "CSHARP_CLI",
    text : "This is some sample text.",
    parent,
};
projects = {
    type : "folder",
    name : "projects",
    children : {
        "CSHARP_CLI" : CS_CLI
    },
    parent,
};
root = {
    type : "folder",
    name :"Home",
    children : {
        "projects" : projects,
        "about me" : about_me
    }
};


CS_CLI.parent = projects
projects.parent = root
currentDir = root

const output = document.getElementById("output");
const input = document.getElementById("input");
const marker = document.getElementById("marker")

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("made it");

        const command = input.value;
        input.value = "";

        // You can process the command here and generate a response
        const response = processCommand(command);
        output.innerHTML += `${response}\n`
        

        // Scroll to the bottom of the terminal
        output.scrollTop = output.scrollHeight;
    }
});

function processCommand(command) {
    // You can implement your own logic for handling commands here
    // For a simple example, we'll just echo the command
    
    return parseInput(command);;
}


function parseInput(input) {
    // Display the command and response in the terminal
    output.innerHTML += getFullTree(currentDir) + `: ~$ ${input}\n`;

    let tokens = input.split(" ");
    console.log(tokens[1]);
    if (tokens[0] == "cd") {
        if (tokens[1] in currentDir.children) {
            currentDir = currentDir.children[tokens[1]]
            marker.innerHTML = getFullTree(currentDir) + ": ~$ ";
            if (currentDir.type == "file") {
                console.log(currentDir.text);
            }
            return `Entering directory: ${currentDir.name}`
        }
    }
}

function getFullTree(directory) {
    let returnStr = `${directory.name}`;
    let cDir = directory;
    while (cDir.name != "Home") {
        cDir = cDir.parent;
        returnStr = `${cDir.name}/` + returnStr;
        
        console.log(cDir.name)
    }

    return returnStr;
}