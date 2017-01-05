import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

const Tag = ({
  label,
  onPress
}) => {
  const tag = (
    <TouchableOpacity style={[styles.tag]} onPress={onPress}>
      <Text style={[styles.tagLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
  return tag
}
Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

class TagInput extends React.Component {
  constructor (props) {
    super(props)

    const {
      initialTags = [],
      initialText = ' '
    } = props

    this.state = {
      tags: initialTags,
      text: initialText
    }

    this.onChangeText = this.onChangeText.bind(this)
  }

  componentWillReceiveProps (props) {
    const {
      initialTags = [],
      initialText = ' '
    } = props

    this.setState({
      tags: initialTags,
      text: initialText
    })
  }

  onChangeText (text) {
    if (text.length === 0) {
      /* `onKeyPress` isn't currently supported on Android I've placed an extra
        space character at the start of `TextInput` which is used to determine if the
        user is erasing.
      */
      this.setState({
        tags: this.state.tags.slice(0, -1),
        text: this.state.tags.slice(-1)[0] || ' '
      }, () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags))
    } else if (
      text.length > 1 &&
      (text.slice(-1) === ' ' || text.slice(-1) === ',')
    ) {
      this.setState({
        tags: [...this.state.tags, text.slice(0, -1).trim()],
        text: ' '
      }, () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags))
    } else {
      this.setState({ text })
    }
  }

  render () {
    return (
      <View style={[styles.container]}>
        {this.state.tags.map((tag, i) => (
          <Tag
            key={i}
            label={tag}
            onPress={e => this.props.onTagPress(i, tag, e)}
          />)
        )}
        <View style={[styles.textInputContainer]}>
          <TextInput
            value={this.state.text}
            style={[styles.textInput, this.props.inputStyle]}
            onChangeText={this.onChangeText}
            underlineColorAndroid='transparent'
          />
        </View>
      </View>
    )
  }
}

TagInput.defaultProps = {
  inputStyle: {}
}

TagInput.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChangeTags: PropTypes.func,
  onTagPress: PropTypes.func,
  inputStyle: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  textInputContainer: {
    flex: 1,
    width: 100,
    height: 32,
    margin: 4,
    borderRadius: 16,
    backgroundColor: '#ccc'
  },

  textInput: {
    margin: 0,
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
    flex: 1,
    height: 32,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)'
  },

  tag: {
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    margin: 4
  },
  tagLabel: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)'
  }
})

export { Tag }
export default TagInput
