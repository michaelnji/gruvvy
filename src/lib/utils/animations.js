import anime from 'animejs';
export function animateEntryUp(selector) {
    anime({
        targets: selector,
        opacity: 1,
        translateY: '0px',
        easing: 'easeInOutElastic(1,2)',
        duration: 1000

    });
}
