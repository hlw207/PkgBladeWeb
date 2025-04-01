interface pipeline {
    /**
     * 任务ID
     */
    missionId: number;
    /**
     * 任务名称，也就是软件包名称
     */
    missionName: string;
    /**
     * 任务描述
     */
    missionDescription: string;
    /**
     * 任务对应的文件类型
     */
    missionType: number;
    /**
     * 任务开始时间
     */
    missionCreateTime: Date;
}

interface pipelineStage {
    /** 阶段名称 */
    missionStageName: string;
    /** 阶段开始时间（建议使用 ISO 8601 字符串格式） */
    missionStageStartTime: Date | null;
    /**
     * 阶段完成时间（未完成/失败时为 null）
     * 注意：原 Java 类注释说 "-1" 表示未完成，但 Timestamp 不能为 -1，
     * 前端统一用 null 表示未完成更合理
     */
    missionStageCompleteTime: Date | null;
    /** 阶段状态 */
    missionStageStatus: number;
}

interface pipelineInfo{
    content: string,
    type: string,
    show: boolean
}

export {type pipeline, type pipelineStage, type pipelineInfo}