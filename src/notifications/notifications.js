import { delay } from './helpers';
import infoIcon from './icons/info.svg';
import successIcon from './icons/success.svg';
import warningIcon from './icons/warning.svg';
import errorIcon from './icons/error.svg';
import closeIcon from './icons/close.svg';

const NOTIFICATION_TYPE_CONFIG = {
    info: {
        icon: infoIcon,
        autoHide: true,
        className: 'notification-item_type_info',
    },
    success: {
        icon: successIcon,
        autoHide: true,
        className: 'notification-item_type_success',
    },
    warning: {
        icon: warningIcon,
        className: 'notification-item_type_warning',
    },
    error: {
        icon: errorIcon,
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
        notificationElement.classList.add('notification-item')
        if (config.className) {
            notificationElement.classList.add(config.className);
        }

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('notification-item__icon-container');
        if (config.icon) {
            iconContainer.innerHTML = config.icon;
        }

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('notification-item__content-container');
        contentContainer.innerText = text;

        const closeIconContainer = document.createElement('div');
        closeIconContainer.classList.add('notification-item__close-icon-container');

        const closeIconElement = document.createElement('div');
        closeIconElement.classList.add('notification-item__close-icon');
        closeIconElement.innerHTML = closeIcon;
        closeIconElement.addEventListener('click', () => {
            this.removeNotification(notificationElement);
        });

        closeIconContainer.appendChild(closeIconElement);

        notificationElement.appendChild(iconContainer);
        notificationElement.appendChild(contentContainer);
        notificationElement.appendChild(closeIconContainer);

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

        this.container.prepend(notificationElement);
        notificationElement.classList.add('notification-item_status_active');
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