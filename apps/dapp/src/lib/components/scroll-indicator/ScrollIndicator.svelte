<div class="scroll-indicator" />

<style lang="scss">
  .scroll-indicator {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
    bottom: var(--spacing-md);
    left: 50%;
    transform: translate(-70%, -50%) rotate(135deg);
    width: 1rem;
    height: 1rem;
    border-top: 0.2rem solid var(--color-dark);
    border-right: 0.2rem solid var(--color-dark);
    opacity: 0.5;

    //bounces up and down
    animation: bounce 1s infinite;

    @keyframes bounce {
      0% {
        transform: translate(-70%, 0) rotate(135deg);
      }
      50% {
        transform: translate(-70%, -0.5rem) rotate(135deg);
      }
      100% {
        transform: translate(-70%, 0) rotate(135deg);
      }
    }
  }
</style>
