export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("Deze browser ondersteunt geen notificaties");
    return false;
  }

  if (Notification.permission === "granted") return true;

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/placeholder.svg",
      badge: "/placeholder.svg",
      tag: "habit-reminder",
      renotify: true,
    });
  }
};