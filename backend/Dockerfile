# Build stage
FROM golang:1.21-alpine AS builder

# Install build dependencies for CGO (needed for SQLite)
RUN apk add --no-cache gcc musl-dev sqlite-dev

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application with CGO enabled for SQLite
RUN CGO_ENABLED=1 GOOS=linux go build -a -ldflags '-linkmode external -extldflags "-static"' -o synapmentor-backend cmd/server/main.go

# Final stage
FROM alpine:latest

# Install runtime dependencies
RUN apk --no-cache add ca-certificates

# Create app directory
WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/synapmentor-backend .

# Make binary executable
RUN chmod +x synapmentor-backend

# Expose port
EXPOSE 8081

# Run the application
CMD ["./synapmentor-backend"]
