import {BooleanFunction} from './BooleanFunction';
import * as PostTheorem from './PostTheorem';

const input = document.getElementById("_input");
const output = document.getElementById("_output");

input.onkeydown = function(event){
    if(event.keyCode == 13)
        processInput(input.value);
};

const processInput = function(value){
    output.innerHTML = ``;
    const lines = value.split('\n');
    const functions = [];

    for(let i = 0; i < lines.length; i++){
        if(lines[i] === '')
            continue;

        try{
            functions.push(new BooleanFunction(lines[i]));
        }
        catch(e){
            output.innerHTML = `
                <div style="color: red;">
                    Error: ${e}
                </div>
            `;
            return;
        }
    }

    const data = PostTheorem.isFullSystem(functions);
    output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
};