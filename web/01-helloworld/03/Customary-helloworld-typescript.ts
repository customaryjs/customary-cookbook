export async function populate() {
    document.getElementById('populate-here')!.append(
        document.createElement('hello-world-part-1'),
        document.createTextNode(' '),
        document.createElement('hello-world-part-2'),
        document.createTextNode(' '),
        document.createElement('hello-world-part-3'),
    );
}
