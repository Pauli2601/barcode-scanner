document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const barcodeInput = document.getElementById('barcodeInput');
    const scanButton = document.getElementById('scanButton');
    const cancelButton = document.getElementById('cancelButton');
    const finishButton = document.getElementById('finishButton');
    const scannerContainer = document.getElementById('scannerContainer');

    let stream;
    let codeReader;

    scanButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(s => {
                stream = s;
                video.srcObject = stream;
                video.play();
                scannerContainer.style.display = 'block';
                scanButton.style.display = 'none';
                cancelButton.style.display = 'inline-block';
                finishButton.style.display = 'inline-block';
                startScanning();
            })
            .catch(err => console.error('Camera access error:', err));
    });

    cancelButton.addEventListener('click', () => {
        stopScanning();
        scannerContainer.style.display = 'none';
        scanButton.style.display = 'inline-block';
        cancelButton.style.display = 'none';
        finishButton.style.display = 'none';
    });

    finishButton.addEventListener('click', () => {
        stopScanning();
        scannerContainer.style.display = 'none';
        scanButton.style.display = 'inline-block';
        cancelButton.style.display = 'none';
        finishButton.style.display = 'none';
    });

    function startScanning() {
        codeReader = new ZXing.BrowserMultiFormatReader();
        codeReader.decodeFromVideoDevice(null, 'video', (res, err) => {
            if (res) {
                console.log('Barcode result:', res.getText());
                barcodeInput.value = res.getText();
            }
        });
    }

    function stopScanning() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if (codeReader) {
            codeReader.reset();
        }
    }
});
