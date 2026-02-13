export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("Deze browser ondersteunt geen notificaties");
    return false;
  }

  if (Notification.permission === "granted") return true;

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = async (title: string, body: string) => {
  if (Notification.permission === "granted") {
    // Probeer eerst via de Service Worker (nodig voor PWA/Achtergrond)
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, {
        body,
        icon: "/placeholder.svg",
        badge: "/placeholder.svg",
        tag: "habit-reminder",
        renotify: true,
        vibrate: [200, 100, 200]
      });
    } else {
      // Fallback voor gewone browser
      new Notification(title, { body, icon: "/placeholder.svg" });
    }
  }
};