import fs from 'fs';

export default class LoggingService {
  logInfo(text) {
    const currentTime = this.getTime();
    const content = currentTime + ' | INFO | ' + text;
    this.writeToFile(content, currentTime);
  }

  logWarning(text) {
    const currentTime = this.getTime();
    const content = currentTime + ' | WARNING | ' + text;
    this.writeToFile(content, currentTime);
  }

  logError(text) {
    const currentTime = this.getTime();
    const content = currentTime + ' | ERROR | ' + text;
    this.writeToFile(content, currentTime);
  }

  writeToFile(message, time) {
    const directoryName = 'logs/';
    if (!fs.existsSync(directoryName)) {
      fs.mkdirSync(directoryName);
  }
    const fileName = directoryName + time.substring(0, 10) + '.txt'; // Stores date portion only in YYYY-MM-DD format
    if (!fs.existsSync(fileName)) {
      // Checks if file doesn't exist
      fs.writeFile(fileName, message + '\r\n', function (err) {
        if (err) throw err;
      });
    } else {
      fs.appendFile(fileName, message + '\r\n', function (err) {
        if (err) throw err;
      });
    }
  }

  getTime() {
    const currentTime = new Date().toJSON().replace('T', ' ').substring(0, 19); // Provides date-time in YYYY-MM-DD hh:mm:ss format
    return currentTime;
  }
}
