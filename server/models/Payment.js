const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'GBP', 'ZAR', 'JPY'],
        uppercase: true
    },
    provider: {
        type: String,
        required: true,
        enum: ['SWIFT', 'Other'],
        default: 'SWIFT'
    },
    recipientName: {
        type: String,
        required: true,
        trim: true
    },
    recipientAccount: {
        type: String,
        required: true,
        match: [/^[A-Z0-9]{8,34}$/, 'Invalid account number format']
    },
    swiftCode: {
        type: String,
        required: true,
        uppercase: true,
        match: [/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Invalid SWIFT code format']
    },
    status: {
        type: String,
        enum: ['pending', 'verified', 'completed', 'failed'],
        default: 'pending'
    },
    reference: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);