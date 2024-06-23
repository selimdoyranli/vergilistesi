<template lang="pug">
.page.tax-page
  ClientOnly
    .container
      .page-head
        h1.page-head__title {{ tax.code }} - {{ tax.title }}
        p.page-head__description
          template(v-if="tax.description?.length > 0") {{ tax.description }}
          template(v-else) {{ $t('list.noDescription') }}

      NuxtLink(:to="localePath('/')" :title="$t('general.goHome')")
        VsButton(size="small") {{ $t('general.goHome') }}
</template>

<script lang="ts" setup>
import taxListTr from '@/data/tax-list/tr.json'

const { locale } = useI18n()

const activeLocale = computed(() => {
  return locale.value
})

const activeList = computed(() => {
  if (activeLocale.value === 'tr') return taxListTr
})

const route = useRoute()

const tax = activeList.value?.find(item => generateSlug(item.title) === route.query.slug)
</script>

<style lang="scss" src="./Tax.page.scss"></style>
