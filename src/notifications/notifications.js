import { delay } from './helpers';

const NOTIFICATION_TYPE_CONFIG = {
    info: {
        className: 'notification-item_type_info',
        autoHide: true,
    },
    success: {
        className: 'notification-item_type_success',
        autoHide: true,
    },
    warning: {
        className: 'notification-item_type_warning',
    },
    error: {
        className: 'notification-item_type_error',
    },
};

export class NotificationsManager {
    constructor() {
        this.container = null;
        this.notificationsCount = 0;
        this.options = {
            lifeTime: 2000,
        };
    }

    createContainer() {
        const containerElement = document.createElement('div');
        containerElement.classList.add('notifications-container');

        return containerElement;
    }

    removeContainer() {
        if (this.container !== null) {
            this.container.remove();
            this.container = null;
        }
    }

    createNotification(text, autoHide, config = {}) {
        this.notificationsCount++;
        const notificationElement = document.createElement('div');
        notificationElement.innerText = text;
        notificationElement.classList.add('notification-item')
        notificationElement.addEventListener('click', () => {
            this.removeNotification(notificationElement);
        });

        if (config.className) {
            notificationElement.classList.add(config.className);
        }
        
        const autoHideValue = autoHide !== undefined
            ? autoHide
            : config.autoHide;

        if (autoHideValue) {
            delay(this.options.lifeTime).then(() => {
                this.removeNotification(notificationElement);
            });
        }

        return notificationElement;
    }

    removeNotification(notificationElement) {
        this.notificationsCount--;
        notificationElement.remove();

        if (this.notificationsCount === 0) {
            this.removeContainer();
        }
    }

    appendNotification(notificationElement) {
        if (this.container === null) {
            this.container = this.createContainer();
            document.body.appendChild(this.container);
        }

        this.container.appendChild(notificationElement);
    }

    showNotification(text, autoHide, config) {
        const notificationElement = this.createNotification(text, autoHide, config);
        this.appendNotification(notificationElement);
    }

    showInfoNotification(text, autoHide) {
        this.showNotification(text, autoHide, NOTIFICATION_TYPE_CONFIG.info)
    }

    showSuccessNotification(text, autoHide) {
        this.showNotification(text, autoHide, NOTIFICATION_TYPE_CONFIG.success)
    }

    showWarningNotification(text, autoHide) {
        this.showNotification(text, autoHide, NOTIFICATION_TYPE_CONFIG.warning)
    }

    showErrorNotification(text, autoHide) {
        this.showNotification(text, autoHide, NOTIFICATION_TYPE_CONFIG.error)
    }
}