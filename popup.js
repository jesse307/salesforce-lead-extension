// popup.js

document.getElementById('captureBtn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, { action: 'captureData' }, (response) => {
      if (chrome.runtime.lastError) {
        showStatus('Error: ' + chrome.runtime.lastError.message, 'error');
        return;
      }
      
      if (response && response.success) {
        showStatus('Data captured successfully!', 'success');
        
        // Open the Lovable app with the data
        const appUrl = 'https://id-preview--300e3d3f-6393-4fa8-9ea2-e17c21482f24.lovable.app/';
        chrome.tabs.create({ url: appUrl });
      } else {
        showStatus('Failed to capture data', 'error');
      }
    });
  } catch (error) {
    showStatus('Error: ' + error.message, 'error');
  }
});

document.getElementById('updateStatusBtn').addEventListener('click', async () => {
  try {
    const button = document.getElementById('updateStatusBtn');
    
    button.disabled = true;
    button.textContent = 'Updating...';
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, { action: 'updateLeadStatus' }, (response) => {
      button.disabled = false;
      button.textContent = 'Update to Attempt 2';
      
      if (chrome.runtime.lastError) {
        showStatus('Error: ' + chrome.runtime.lastError.message, 'error');
        return;
      }
      
      if (response && response.success) {
        showStatus('Status updated to Attempt 2!', 'success');
      } else {
        showStatus('Failed: ' + (response?.error || 'Unknown error'), 'error');
      }
    });
  } catch (error) {
    showStatus('Error: ' + error.message, 'error');
  }
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = type;
  
  setTimeout(() => {
    statusDiv.className = '';
  }, 3000);
}