describe('environmental variables', () => {

    const OLD_ENV = process.env;
  
    beforeEach(() => {
      jest.resetModules()
      process.env = {
        ...OLD_ENV
      };
    });
  
    afterAll(() => {
      process.env = OLD_ENV;
    });
  
    test('will receive process.env TEST variables', () => {
  
      expect(process.env.REACT_APP_TESTING_ENV).toContain('YesTestenv');
      
    });
  
  });