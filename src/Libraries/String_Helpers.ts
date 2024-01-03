export let FormatToDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export const CapitalizeFirstCharacterOfWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}