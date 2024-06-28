class ELearningBaseModelResponse {
    id?: number;
    courseElearningId?: number;
    /// <summary>
    /// Tên khóa học
    /// </summary>
    courseElearningName?: string;

    /// <summary>
    /// Ngày tạo courser e-learning
    /// </summary>
    courseElearningDate?: Date;

    createdDate?: Date;

    /// <summary>
    /// Số lượt đăng ký
    /// </summary>
    mumberOfRegistrations?: number;

    /// <summary>
    /// 5%
    /// những cái % này thì mình lấy từ bizfly ra
    /// </summary>
    numberOfLearners5Percent?: number;

    /// <summary>
    /// 25%
    /// những cái % này thì mình lấy từ bizfly ra
    /// </summary>
    numberOfLearners25Percent?: number;

    /// <summary>
    /// 50%
    /// những cái % này thì mình lấy từ bizfly ra
    /// </summary>
    numberOfLearners50Percent?: number;

    /// <summary>
    /// 75%
    /// những cái % này thì mình lấy từ bizfly ra
    /// </summary>
    numberOfLearners75Percent?: number;

    /// <summary>
    /// 90%
    /// những cái % này thì mình lấy từ bizfly ra
    /// </summary>
    numberOfLearners90Percent?: number;

    /// <summary>
    /// 100%
    /// những cái % này thì mình lấy từ bizfly ra
    /// </summary>
    numberOfLearners100Percent?: number;

    /// <summary>
    /// Tên diễn giả
    /// </summary>
    speakerName?: string;

    /// <summary>
    /// Số điện thoại
    /// </summary>
    phoneNumber?: string;

    /// <summary>
    /// Tổ chức
    /// </summary>
    organizationName?: string;
}

export class FreeCourseModelResponse extends ELearningBaseModelResponse {
    adsAmount?: number;
}

export class MembershipCourseModelResponse extends ELearningBaseModelResponse {
    adsAmount?: number;
}

export class PaidCourseModelResponse extends ELearningBaseModelResponse {
    adsAmount?: number;
    referralCommissions?: number;
    courseRevenue?: number;
}

export class CollaboratorModelResponse extends ELearningBaseModelResponse {
}

export class InstructorCourseModelResponse extends ELearningBaseModelResponse {
}