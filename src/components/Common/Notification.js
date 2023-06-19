import { NotificationManager } from 'react-notifications';

export function handleNotification(data, msg, title, type) {


    if (data.warnings && data.warnings.length > 0) {
        data.warnings.map((item, key) =>
            NotificationManager.warning((item.message || item.desc), item.code, 5000)
        )
    } else
    if (data.errors && data.errors.length > 0) {
        data.errors.map((item, key) =>
            NotificationManager.error((item.message || item.desc), item.code, 5000)
        )
    } else if (data.error ) {
        
        NotificationManager.error(data.error.error_details ? data.error.error_details : data.error.error_message, data.error.error_code, 10000)
        
    } else {
        if(type === 'info')
            NotificationManager.info(msg, title);
        else
            NotificationManager.success(msg, title, 10000);
    }
    
    return;
}