const { width, height } = $device.info.screen

const createContainer = ID_list => ID_list.map(id => ({
    title: id,
    rows: [
      {
        type: 'view',
        props: {
          id
        },
        layout: $layout.fill
      }
    ]
  }))

export default {
  props: {
    title: '',
    debugging: true
  },
  views: [
    {
      type: 'list',
      props: {
        rowHeight: width,
        data: createContainer(['ClassExample', 'ReducerExample', 'CacheExample', 'MotionExample', 'HttpExample'])
      },
      layout(make, view) {
        make.edges.equalTo(view.super.safeArea)
      }
    }
  ]
}
