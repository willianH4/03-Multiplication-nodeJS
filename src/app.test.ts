import { ServerApp } from "./presentation/server.app";

describe('Test app.ts', () => {
    
    test('should call Server.run with values', async() => {
        const serverMock = jest.fn();
        ServerApp.run = serverMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination']
        await import('./app');

        expect( serverMock ).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination'
        });
    });

});