import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SavedFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom-content',
        fileDestination: 'outputs/custom-file',
        fileName: 'table-custom'
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    
    afterEach(() => {
        // clean up
        const outputFolderExists = fs.existsSync('outputs');
        if( outputFolderExists ) fs.rmSync('outputs', {recursive: true});

        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if( customOutputFolderExists ) fs.rmSync( customOptions.fileDestination, { recursive: true } ); 
        
    })
    
    test('should save file with default values', () => {
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test-content'
        }

        const result = saveFile.execute(options);
        const checkExistFile = fs.existsSync( filePath );
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
        
        expect( result ).toBe( true );
        expect( checkExistFile ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );
    });

    test('should save file with custom values', () => {
        
        const saveFile = new SaveFile();

        const result = saveFile.execute( customOptions );
        const checkExistFile = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync( customFilePath, {encoding: 'utf-8'});
        
        expect( result ).toBe( true );
        expect( checkExistFile ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );
    });

    test('should return false if directory could not be created', () => {
        
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error'); }
        );

        const result = saveFile.execute(customOptions);

        expect( result ).toBe( false );

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {
        
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing'); }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );

        writeFileSpy.mockRestore();

    });

});