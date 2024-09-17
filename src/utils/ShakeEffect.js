// shakeEffect.js
export function triggerShake(element) {
    if (element) {
        console.log('Triggering shake effect on:', element);
        element.classList.remove('input-error'); // Remove the class to reset the animation
        void element.offsetWidth; // Force reflow to restart the CSS animation
        element.classList.add('input-error'); // Add the class to trigger the shake animation
        console.log('Added .input-error class to:', element);
    } else {
        console.error('Element for shake effect not found.');
    }
}
