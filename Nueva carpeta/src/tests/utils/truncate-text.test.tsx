import {truncateText} from '../../utils/truncate-text';

describe('truncateText', () => {

    test('should return an empty string if text is null', () => {
      expect(truncateText(null, 10)).toBe('');
    });
  
    test('should return an empty string if text is undefined', () => {
      expect(truncateText(undefined, 10)).toBe('');
    });
  
    test('should return the original text if its length is less than or equal to maxLength', () => {
      const text = 'Hello World';
      expect(truncateText(text, 15)).toBe(text);
      expect(truncateText(text, 11)).toBe(text);
    });
  
    test('should truncate the text and append ... at the end if its length is greater than maxLength', () => {
      const text = 'Hello World';
      expect(truncateText(text, 5)).toBe('Hello...');
      expect(truncateText(text, 8)).toBe('Hello Wo...');
    });
}); 