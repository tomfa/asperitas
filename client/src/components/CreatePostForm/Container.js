import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import {
  titleValidator,
  urlValidator,
  textPostValidator,
  typeValidator
} from '../../util/validators';
import { attemptCreatePost } from '../../actions/posts';
import categories from '../../categories';
import withAuth from '../../util/withAuth';
import CreatePostForm from './Component';
import requireAuthIfPrivate from '../../util/requireAuthIfPrivate';

const validate = fields => {
  const errors = {};
  const title = fields.title ? fields.title : '';
  const url = fields.url ? fields.url : '';
  const type = fields.type ? fields.type : '';
  const text = fields.text ? fields.text : '';

  errors.title = titleValidator(title);
  if (type === 'link') errors.url = urlValidator(url);
  if (type === 'text') errors.text = textPostValidator(text);
  errors.type = typeValidator(type);

  return errors;
};

const mapStateToProps = state => ({
  isFetching: state.posts.isFetching,
  post: state.posts.newPost,
  form: state.form.createPost
});
const getQueryParam = key => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

const mapDispatchToProps = { attemptCreatePost };

const enhance = compose(
  reduxForm({
    form: 'createPost',
    initialValues: {
      category:
        categories.find(o => o === getQueryParam('category')) || categories[1],
      type: 'link'
    },
    validate
  }),
  requireAuthIfPrivate,
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const CreatePostFormContainer = enhance(CreatePostForm);

export default CreatePostFormContainer;
