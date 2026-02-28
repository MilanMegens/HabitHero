export const requestNotificationPermission = async () => {
  // Voor ntfy.sh hebben we geen browser-permissie nodig, 
  // maar we laten de functie staan voor compatibiliteit.
  return true;
};

export const sendNotification = async (title: string, body: string) => {
  const topic = localStorage.getItem('ntfy_topic');
  
  if (!topic) {
    console.warn("Geen ntfy topic ingesteld in de instellingen.");
    return;
  }

  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      body: body,
      headers: {
        'Title': title,
        'Priority': 'high',
        'Tags': 'white_check_mark,alarm_clock'
      }
    });
    console.log(`Melding verstuurd naar ntfy topic: ${topic}`);
  } catch (error) {
    console.error('Fout bij versturen ntfy melding:', error);
  }
};