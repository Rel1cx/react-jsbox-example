export const apiKey = 'CgmUYY7jA6RULFVV94KPFgsi3kq2LEUn3Kn6TY8L'

export const codeIcon = $file.read('assets/code.png').image

export const listTemplate = {
  views: [
    {
      type: 'label',
      props: {
        bgcolor: $color('#474b51'),
        textColor: $color('#abb2bf'),
        align: $align.center,
        font: $font('iosevka', 24)
      },
      layout: $layout.fill
    }
  ]
}
