import React, { useEffect } from 'react'
import { Slot, router } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import * as Notifications from 'expo-notifications';

function useNotificationObserver() {
    useEffect(() => {
        let isMounted = true;

        function redirect(notification: Notifications.Notification) {
            const url = notification.request.content.data?.url;
            if (url) {
                router.push(url);
            }
        }

        Notifications.getLastNotificationResponseAsync()
            .then(response => {
                if (!isMounted || !response?.notification) {
                    return;
                }
                redirect(response?.notification);
            });

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            redirect(response.notification);
        });

        return () => {
            isMounted = false;
            subscription.remove();
        };
    }, []);
}



export default function RootLayout() {
    useNotificationObserver();
    return (
        <Provider store={store}>
            <Slot />
        </Provider>
    )
}