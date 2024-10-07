from tensorflow.keras import backend as K



def dice_coefficients(y_true, y_pred, smooth=100):
    """
    Computes the Dice similarity coefficient between the true and predicted values.

    The Dice coefficient is a statistical metric used to gauge the similarity of two samples.
    With a range from 0 to 1, the Dice coefficient is 1 when the two samples are identical and
    0 when they share no elements. A smoothing term is included to prevent division by zero.

    This function is typically used as a loss function for binary segmentation tasks,
    where the true and predicted values are binary masks of the same size.
    """

    y_true_flatten = K.flatten(y_true)
    y_pred_flatten = K.flatten(y_pred)

    intersection = K.sum(y_true_flatten * y_pred_flatten)
    union = K.sum(y_true_flatten) + K.sum(y_pred_flatten)
    return (2 * intersection + smooth) / (union + smooth)


def dice_coefficients_loss(y_true, y_pred, smooth=100):
    """
    The Dice loss function for image segmentation models.

    The Dice loss is a measure of the overlap between the prediction (y_pred)
    and the ground truth (y_true). It ranges from 0 to 1, where a Dice loss
    of 1 indicates perfect overlap (i.e., a perfect segmentation), while a Dice
    loss of 0 indicates no overlap.
    """

    return -dice_coefficients(y_true, y_pred, smooth)


def iou(y_true, y_pred, smooth=100):
    """
    Calculates the Intersection over Union (IoU) between the true and predicted values.

    IoU, also known as the Jaccard Index, is a metric used to quantify the percent overlap
    between the target mask and our prediction output. It's often used in segmentation problems
    to evaluate the quality of predictions.
    """
    intersection = K.sum(y_true * y_pred)
    sum = K.sum(y_true + y_pred)
    iou = (intersection + smooth) / (sum - intersection + smooth)
    return iou



def jaccard_distance(y_true, y_pred):

    # Function to compute the Jaccard distance between the true labels and the predicted labels.

    y_true_flatten = K.flatten(y_true)
    y_pred_flatten = K.flatten(y_pred)
    return -iou(y_true_flatten, y_pred_flatten)
