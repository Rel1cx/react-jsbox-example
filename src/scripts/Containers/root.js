export default {
  props: {
    title: '',
    debugging: true
  },
  views: [
    {
      type: 'view',
      props: {
        id: 'root'
      },
      layout(make, view) {
        make.edges.equalTo(view.super.safeArea)
      }
    }
  ]
}
