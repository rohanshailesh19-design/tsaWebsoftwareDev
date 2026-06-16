const ttsEnabled = localStorage.getItem('ttsEnabled') === 'true';
let audioUnlocked = false;
let currentUtterance = null;
let isDemoPlaying = false;

  document.addEventListener('click', () => {
    audioUnlocked = true;
  }, { once: true });

  
  function speak(text) {
    if (isDemoPlaying) return;
    if (currentUtterance) {
      window.speechSynthesis.cancel();
      currentUtterance = null;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => currentUtterance = null;
    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if (isDemoPlaying) return;
    window.speechSynthesis.cancel();
    currentUtterance = null
  }

  const selectors = [
    //just enter the specific element class/id to which you want to be read
    '.navbar',
    '.welcome',
    '.titleSet',
    '.titleofDash',
    '.topTTSbox',
    '#uploadBtn',
    '#fileName',
    '#audioUploadBtn',
    '#audioFileName',
    '#audioCaptionUploadBtn',
    '#audioCaptionFileName',
    '#videoUploadBtn',
    '#videoFileName',
    '#captionUploadBtn',
    '#captionFileName',
    '#audioFileContent'
  ];

  selectors.forEach(selector => {
    const el = document.querySelector(selector);
    console.log(selector, el);
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      if (localStorage.getItem('ttsEnabled') !== 'true') return;
      if (!audioUnlocked) return;
      speak(el.innerText.trim().replace(/\s+/g, ' '));
    });
    el.addEventListener('mouseleave', () => stopSpeech());
  });

  //copy this for all repeated elements
  document.querySelectorAll('.settingOptions').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      if (localStorage.getItem('ttsEnabled') !== 'true') return;
      if (!audioUnlocked) return;
      speak(el.innerText.trim().replace(/\s+/g, ' '));
    });
    el.addEventListener('mouseleave', () => stopSpeech());
  });

  document.querySelectorAll('.gallery').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      if (localStorage.getItem('ttsEnabled') !== 'true') return;
      if (!audioUnlocked) return;
      speak(el.innerText.trim().replace(/\s+/g, ' '));
    });
    el.addEventListener('mouseleave', () => stopSpeech());
  });

  document.querySelectorAll('.realDesc').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      if (localStorage.getItem('ttsEnabled') !== 'true') return;
      if (!audioUnlocked) return;
      speak(el.innerText.trim().replace(/\s+/g, ' '));
    });
    el.addEventListener('mouseleave', () => stopSpeech());
  });

  document.querySelectorAll('#tryNowButton').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      if (localStorage.getItem('ttsEnabled') !== 'true') return;
      if (!audioUnlocked) return;
      speak(el.innerText.trim().replace(/\s+/g, ' '));
    });
    el.addEventListener('mouseleave', () => stopSpeech());
  });

  document.querySelectorAll('#ttsButton').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      if (localStorage.getItem('ttsEnabled') !== 'true') return;
      if (!audioUnlocked) return;
      speak(el.innerText.trim().replace(/\s+/g, ' '));
    });
    el.addEventListener('mouseleave', () => stopSpeech());
  });
  
