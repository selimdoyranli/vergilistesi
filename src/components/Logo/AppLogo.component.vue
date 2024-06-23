<template lang="pug">
NuxtLink.app-logo(:to="localePath('/')" :title="$t('app.name')")
  img.app-logo__img(src="@/assets/media/core/logo/vergilistesi-logo.png" alt="vergilistesi logo" width="auto" height="42px")
  span.app-logo__title {{ $t('app.name') }}
</template>

<style lang="scss" src="./AppLogo.component.scss"></style>
