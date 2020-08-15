import { NotificationsManager } from './notifications/notifications.js';

const controls = {
    addInfoNotification: document.getElementById('control-add-info-notification'),
    addSuccessNotification: document.getElementById('control-add-success-notification'),
    addWarningNotification: document.getElementById('control-add-warning-notification'),
    addErrorNotification: document.getElementById('control-add-error-notification'),
};

let counter = 0;
const notificationManager = new NotificationsManager();

controls.addInfoNotification.addEventListener('click', () => {
    notificationManager.showInfoNotification(`Some information text ${++counter}`, false);
});
controls.addSuccessNotification.addEventListener('click', () => {
    notificationManager.showSuccessNotification(`Some success text ${++counter}`, false);
});
controls.addWarningNotification.addEventListener('click', () => {
    notificationManager.showWarningNotification(`Some warning text ${++counter}`, false);
});
controls.addErrorNotification.addEventListener('click', () => {
    notificationManager.showErrorNotification(`Some error text ${++counter}`, false);
});
