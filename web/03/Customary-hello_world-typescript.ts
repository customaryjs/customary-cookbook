import {Customary} from 'customary/Customary.js';

export async function populate() {
    await Customary.define();

    document.getElementById('populate-here')!.append(
        document.createElement('hello-world-part-1'),
        document.createTextNode(' '),
        document.createElement('hello-world-part-2'),
        document.createTextNode(' '),
        document.createElement('hello-world-part-3'),
    );
}
