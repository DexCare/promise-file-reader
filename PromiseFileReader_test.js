const {expect, assert} = require('chai')
const sinon = require('sinon')

const {readAsDataURL, readAsText, readAsArrayBuffer} = require('./PromiseFileReader')
describe('PromiseFileReader', () => {
  beforeEach(() => {
    function mockProgress(fileReader) {
      const total = 100;
      for(let loaded=0; loaded < total; loaded += 1) {
        fileReader.onprogress({
          loaded,
          total,
          lengthComputable: true,
        })
      }
    }
    Blob = class Blob{}
    File = class File extends Blob{}
    FileReader = class FileReader{
      onload() {}
      onerror() {}
      onprogress() {}
      readAsDataURL() {
        mockProgress(this);
      }
      readAsText() {
        mockProgress(this);
      }
      readAsArrayBuffer() {
        mockProgress(this);
      }
    }
  })

  describe('readAsDataURL', () => {
    it('should be a function', () => {
      expect(readAsDataURL).to.be.a('function')
    })
    it('should return a promise', () => {
      Blob = class Files{}
      expect(readAsDataURL(new Blob())).to.be.a('promise')
    })
    it('should require a Blob or File', () => {
      class MockClass {}
      expect(readAsDataURL).to.throw()
      expect(() => readAsDataURL(new MockClass())).to.throw()
      expect(() => readAsDataURL(new Blob())).to.not.throw()
      expect(() => readAsDataURL(new File())).to.not.throw()
    })
    it('should call the original function', () => {
      const callback = sinon.spy();
      FileReader.prototype.readAsDataURL = callback

      const mockBlob = new Blob()
      mockBlob.id = 1

      readAsDataURL(mockBlob)

      sinon.assert.calledOnce(callback);
      sinon.assert.calledWith(callback, mockBlob)
    })
    it('should report progress to options.progress if provided', () => {
      const progress = sinon.spy();
      const mockBlob = new Blob()
      readAsDataURL(mockBlob, {progress});
      sinon.assert.calledWith(progress, {
        total: 100,
        loaded: 0,
        lengthComputable: true,
      })
      sinon.assert.calledWith(progress, {
        total: 100,
        loaded: 50,
        lengthComputable: true,
      })
      sinon.assert.calledWith(progress, {
        total: 100,
        loaded: 99,
        lengthComputable: true,
      })
    })
  })

  describe('readAsText', () => {
    it('should be a function', () => {
      expect(readAsText).to.be.a('function')
    })
    it('should return a promise', () => {
      Blob = class Files{}
      expect(readAsText(new Blob())).to.be.a('promise')
    })
    it('should require a Blob or File', () => {
      class MockClass {}
      expect(readAsText).to.throw()
      expect(() => readAsText(new MockClass())).to.throw()
      expect(() => readAsText(new Blob())).to.not.throw()
      expect(() => readAsText(new File())).to.not.throw()
    })
    it('should call the original function', () => {
      const callback = sinon.spy();
      FileReader.prototype.readAsText = callback

      const mockBlob = new Blob()
      mockBlob.id = 1

      readAsText(mockBlob)

      sinon.assert.calledOnce(callback);
      sinon.assert.calledWith(callback, mockBlob)
    })
  })

  describe('readAsArrayBuffer', () => {
    it('should be a function', () => {
      expect(readAsArrayBuffer).to.be.a('function')
    })
    it('should return a promise', () => {
      Blob = class Files{}
      expect(readAsArrayBuffer(new Blob())).to.be.a('promise')
    })
    it('should require a Blob or File', () => {
      class MockClass {}
      expect(readAsArrayBuffer).to.throw()
      expect(() => readAsArrayBuffer(new MockClass())).to.throw()
      expect(() => readAsArrayBuffer(new Blob())).to.not.throw()
      expect(() => readAsArrayBuffer(new File())).to.not.throw()
    })
    it('should call the original function', () => {
      const callback = sinon.spy();
      FileReader.prototype.readAsArrayBuffer = callback

      const mockBlob = new Blob()
      mockBlob.id = 1

      readAsArrayBuffer(mockBlob)

      sinon.assert.calledOnce(callback);
      sinon.assert.calledWith(callback, mockBlob)
    })
  })

})
