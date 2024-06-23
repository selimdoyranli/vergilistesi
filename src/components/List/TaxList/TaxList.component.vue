<template lang="pug">
.tax-list
  .tax-list-group(v-for="group in groupedItems" :key="group.letter")
    strong.tax-list-group__title {{ group.letter }}

    .tax-list-group__items
      template(v-for="item in group.items" :key="item.title")
        NuxtLink.card.tax-list-card(:to="localePath(`/vergi?slug=${generateSlug(item.title)}`)" :title="item.title")
          .tax-list-card__border
          .tax-list-card__inner
            strong.tax-list-card__title {{ item.title }}
            span.tax-list-card__code {{ $t('general.taxCode') }}: {{ item.code }}
            button.tax-list-card__seeButton
              AppIcon(name="tabler:arrow-right" :width="24" :height="24")
</template>

<script lang="ts" setup>
import type { ListItemTypes, ListTypes } from './TaxList.component.types'
import taxListTr from '@/data/tax-list/tr.json'

const baseClassName = 'tax-list'

const { locale } = useI18n()

const activeLocale = computed(() => {
  return locale.value
})

const activeList = computed(() => {
  if (activeLocale.value === 'tr') return taxListTr
})

const list: Ref<ListTypes> = ref([...(activeList.value as ListTypes)])

const groupedItems = computed(() => {
  const groups: Record<string, { letter: string; items: ListItemTypes[] }> = {}

  for (const item of list.value) {
    const letter = item.code.charAt(0).toUpperCase()

    if (!groups[letter]) {
      groups[letter] = { letter, items: [] }
    }
    groups[letter].items.push(item)
  }

  return Object.values(groups).sort((a, b) => a.letter.localeCompare(b.letter))
})

const makeGlowEffect = () => {
  window.onmousemove = e => {
    for (const card of document.querySelectorAll(`.${baseClassName}-card`)) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top

      if (card instanceof HTMLElement) {
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      }
    }
  }
}

onMounted(async () => {
  await nextTick()

  makeGlowEffect()
})
</script>

<style lang="scss" src="./TaxList.component.scss"></style>
