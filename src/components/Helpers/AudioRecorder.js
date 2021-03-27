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

export function stopRecording(callback) {
  recorder.stopRecording(() => {
    const blob = recorder.getBlob();
    recorder.destroy();
    microphone.stop();
    microphone = null;
    recorder = null;
    if (callback) callback(blob);
  });
}

export function pauseRecording() {
  recorder.pauseRecording();
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
