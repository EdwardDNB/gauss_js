import sinon from 'sinon'; // Імпортуємо Sinon
import matrix from '../matrix.js'; // Імпортуємо клас Matrix
import { expect } from 'chai'; // Імпортуємо Chai для асерцій


describe('Matrix Mocking Tests', function() {

    let matrixInstance;
    let sandbox;

    // Перед кожним тестом створюємо новий екземпляр класу Matrix та Sinon sandbox
    beforeEach(function() {
        matrixInstance = new matrix(3); // Створюємо матрицю 3x4 (3 рядки, 4 колонки)
        sandbox = sinon.createSandbox();
    });

    // Після кожного тесту очищаємо всі мокування та шпигуни
    afterEach(function() {
        sandbox.restore();
    });

    it('should mock the printm method', function() {
        // Мокуємо метод printm
        const printMock = sandbox.mock(matrixInstance).expects('printm').once();

        // Викликаємо метод
        matrixInstance.printm();

        // Перевіряємо, що метод був викликаний
        printMock.verify();
    });

    it('should stub the get method and return specific value', function() {
        // Стубимо метод get, щоб він повертав значення 42 для будь-якого i та j
        const getStub = sandbox.stub(matrixInstance, 'get').returns(42);

        // Перевіряємо, що метод get повертає 42
        expect(matrixInstance.get(0, 0)).to.equal(42);
        expect(matrixInstance.get(2, 3)).to.equal(42);

        // Перевіряємо, що метод був викликаний
        sinon.assert.calledTwice(getStub);
    });

    it('should spy on the mull_add method', function() {
        // Створюємо шпигун на метод mull_add
        const spy = sandbox.spy(matrixInstance, 'mull_add');

        // Викликаємо метод mull_add
        matrixInstance.mull_add(0, 1, 2);

        // Перевіряємо, що метод був викликаний з правильними аргументами
        sinon.assert.calledWith(spy, 0, 1, 2);
    });
});
