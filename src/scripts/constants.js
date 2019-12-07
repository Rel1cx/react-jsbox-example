export const apiKey = 'awVphvq9cwPg9f1F1ij20tUaILmj0t3KP6DTWVDW'

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
