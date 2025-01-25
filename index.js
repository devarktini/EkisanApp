import 'react-native-get-random-values'; // Import this first if using UUID or related libraries
if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
