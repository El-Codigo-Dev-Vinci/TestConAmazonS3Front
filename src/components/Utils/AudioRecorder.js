import RecordRTC from 'recordrtc';
let recorder;
let microphone;

export async function startRecording(setRecordingState) {
  try {
    if (!recorder) {
      microphone = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      recorder = RecordRTC(microphone, { type: 'audio' });
      recorder.onStateChanged = setRecordingState;
      recorder.startRecording();
    } else {
      recorder.resumeRecording();
    }
  } catch (error) {
    alert('Unable to capture your microphone.');
    console.error(error);
  }
}

export function stopRecording() {
  recorder.stopRecording(() => {
    microphone.stop();
    microphone = null;
  });
}

export function pauseRecording() {
  recorder.pauseRecording();
}

export function getAudio(fileName) {
  var blob = recorder.getBlob();

  // we need to upload "File" --- not "Blob"
  var fileObject = new File([blob], fileName, {
    type: 'audio/webm',
  });
  return fileObject;
}

export function cleanRecorder() {
  recorder.destroy();
  recorder = null;
}

export function canRecord() {
  return (
    !recorder || ['inactive', 'paused', 'stopped'].includes(recorder.getState())
  );
}

export function canPause() {
  return recorder && ['recording'].includes(recorder.getState());
}

export function canStop() {
  return recorder && ['paused', 'recording'].includes(recorder.getState());
}

export function canSave() {
  return recorder && ['stopped'].includes(recorder.getState());
}
