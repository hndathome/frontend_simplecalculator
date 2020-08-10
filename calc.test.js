import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('calculator functionality', () => {
    beforeEach(() => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        container = dom.window.document.body;
    })

    test('has a clear button', () => {
        expect(container.querySelector('#clearValues')).not.toBeNull();
        expect(getByText(container, 'Clear')).toBeInTheDocument();
    })

    test('has an add button', () => {
        expect(container.querySelector('#addValues')).not.toBeNull();
        expect(getByText(container, '+')).toBeInTheDocument();
    })

    test('has a subtract button', () => {
        expect(container.querySelector('#subtractValues')).not.toBeNull();
        expect(getByText(container, '-')).toBeInTheDocument();
    })

    test('has a multiply button', () => {
        expect(container.querySelector('#multiplyValues')).not.toBeNull();
        expect(getByText(container, '*')).toBeInTheDocument();
    })

    test('has a division button', () => {
        expect(container.querySelector('#divideValues')).not.toBeNull();
        expect(getByText(container, '/')).toBeInTheDocument();
    })

    test('has an enter button', () => {
        expect(container.querySelector('#calculate')).not.toBeNull();
        expect(getByText(container, 'Enter')).toBeInTheDocument();
    })

    test('can add two numbers', () => {

        let number1 = container.querySelector("#value1");
        let number2 = container.querySelector("#value2");

        fireEvent.change(number1, { target: { value: 2 } });
        fireEvent.change(number2, { target: { value: 3 } });

        const buttonAdd = container.querySelector('#addValues');
        fireEvent.click(buttonAdd);

        const buttonEnter = getByText(container, 'Enter');
        fireEvent.click(buttonEnter);

        let result = container.querySelector("#simpleResult");
        expect(result.innerHTML).toBe('= 5');
    })

    test('can subtract two numbers', () => {

        let number1 = container.querySelector("#value1");
        let number2 = container.querySelector("#value2");

        fireEvent.change(number1, { target: { value: 2 } });
        fireEvent.change(number2, { target: { value: 3 } });

        const buttonSubtract = container.querySelector('#subtractValues');
        fireEvent.click(buttonSubtract);

        const buttonEnter = getByText(container, 'Enter');
        fireEvent.click(buttonEnter);

        let result = container.querySelector("#simpleResult");
        expect(result.innerHTML).toBe('= -1');
    })

    test('can multiply two numbers', () => {

        let number1 = container.querySelector("#value1");
        let number2 = container.querySelector("#value2");

        fireEvent.change(number1, { target: { value: 2 } });
        fireEvent.change(number2, { target: { value: 3 } });

        const buttonMultiply = container.querySelector('#multiplyValues');
        fireEvent.click(buttonMultiply);

        const buttonEnter = getByText(container, 'Enter');
        fireEvent.click(buttonEnter);

        let result = container.querySelector("#simpleResult");
        expect(result.innerHTML).toBe('= 6');
    })

    test('can divide two numbers', () => {

        let number1 = container.querySelector("#value1");
        let number2 = container.querySelector("#value2");

        fireEvent.change(number1, { target: { value: 3 } });
        fireEvent.change(number2, { target: { value: 2 } });

        const buttonDivide = container.querySelector('#divideValues');
        fireEvent.click(buttonDivide);

        const buttonEnter = getByText(container, 'Enter');
        fireEvent.click(buttonEnter);

        let result = container.querySelector("#simpleResult");
        expect(result.innerHTML).toBe('= 1.5');
    })
})